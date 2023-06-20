import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ReactElement } from "react";

import { options } from "src/pages/api/auth/[...nextauth]";

import { LoginPage } from "./component";

const Page = async (): Promise<ReactElement | null> => {
    const session = await getServerSession(options);

    if (session) {
        redirect("/");

        return null;
    }

    return <LoginPage />;
};

export default Page;
