import { Metadata } from "next";
import { ReactElement } from "react";

import { ContactPage } from "./_components";

export const metadata: Metadata = {
    title: "Contact"
};

const Page = (): ReactElement => (
    <ContactPage />
);

export default Page;
