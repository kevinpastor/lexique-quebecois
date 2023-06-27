import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ReactElement } from "react";

import { options } from "@app/api/auth/[...nextauth]/options";

import { LoginPage } from "./_components";

const Page = async (): Promise<ReactElement> => {
    const session = await getServerSession(options);

    if (session) {
        redirect("/");
    }

    return <LoginPage />;
};

export default Page;
