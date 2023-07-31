import { Metadata } from "next";
import { ReactElement } from "react";

import { PrivacyPage } from "./_components";

export const metadata: Metadata = {
    title: "Confidentialité"
};

const Page = (): ReactElement => (
    <PrivacyPage />
);

export default Page;
