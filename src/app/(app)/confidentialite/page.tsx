import { type Metadata } from "next";
import { type ReactNode } from "react";

import { PrivacyPage } from "./_components";

export const metadata: Metadata = {
    title: "Confidentialité"
};

const Page = (): ReactNode => (
    <PrivacyPage />
);

export default Page;
