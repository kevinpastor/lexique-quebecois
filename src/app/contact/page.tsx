import { Metadata } from "next";
import { ReactElement } from "react";

import { ContactPage } from "@components/pages/contact-page";

export const metadata: Metadata = {
    title: "Contact - Lexique Québécois"
};

const Page = (): ReactElement => (
    <ContactPage />
);

export default Page;
