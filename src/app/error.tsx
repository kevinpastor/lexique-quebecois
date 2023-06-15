"use client";

import { Metadata } from "next";
import { ReactElement } from "react";

import { InternalErrorPage } from "@components/pages/internal-error-page";

export const metadata: Metadata = {
    title: "Lexique Québécois"
};

const Error = (): ReactElement => (
    <InternalErrorPage />
);

export default Error;
