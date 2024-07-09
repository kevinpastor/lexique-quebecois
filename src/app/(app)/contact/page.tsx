import { type Metadata } from "next";
import { type ReactNode } from "react";

import { ContactPage } from "./_components";

export const metadata: Metadata = {
    title: "Contact"
};

const Page = (): ReactNode => (
    <ContactPage />
);

export default Page;
