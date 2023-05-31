import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";

import { LoginPage } from "@components/pages/login-page/login-page";

import { options } from "./api/auth/[...nextauth]";

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<unknown>> => {
    const session = await getServerSession(context.req, context.res, options);

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
};

export default LoginPage;
