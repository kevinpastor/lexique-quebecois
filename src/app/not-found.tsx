import { type Metadata } from "next";
import { type ReactElement } from "react";

import { NotFoundPage } from "./_components/not-found-page";

export const metadata: Metadata = {
    title: "404"
};

const NotFound = (): ReactElement => (
    <NotFoundPage />
);

export default NotFound;
