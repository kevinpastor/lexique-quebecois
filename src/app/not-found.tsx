import { Metadata } from "next";
import { ReactElement } from "react";

import { NotFoundPage } from "@components/pages/not-found-page";

export const metadata: Metadata = {
    title: "404 - Lexique Québécois"
};

const NotFound = (): ReactElement => (
    <NotFoundPage />
);

export default NotFound;
