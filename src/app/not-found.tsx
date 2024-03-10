import { type Metadata } from "next";
import { type ReactNode } from "react";

import { NotFoundPage } from "./_components/not-found-page";

export const metadata: Metadata = {
    title: "404"
};

const NotFound = (): ReactNode => (
    <NotFoundPage />
);

export default NotFound;
