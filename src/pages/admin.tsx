import { GetServerSidePropsResult } from "next";
import { ReactElement } from "react";

import { isDevelopmentEnvironment } from "@utils/misc/environment";

export const getServerSideProps = (): GetServerSidePropsResult<unknown> => {
    if (!isDevelopmentEnvironment()) {
        return {
            notFound: true
        };
    }

    return {
        props: {}
    };
};

const Admin = (): ReactElement => (
    <>
        Hello world!
    </>
);

export default Admin;
