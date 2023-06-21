import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ReactElement } from "react";

import { LoginPage } from "./component";
import { options } from "../api/auth/[...nextauth]/options";

const Page = async (): Promise<ReactElement> => {
    const session = await getServerSession(options);

    if (session) {
        redirect("/");
    }

    return <LoginPage />;
};

export default Page;
