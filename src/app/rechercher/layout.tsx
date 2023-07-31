import { PropsWithChildren, ReactElement } from "react";

const Layout = ({ children }: PropsWithChildren): ReactElement => (
    <>
        hello
        {children}
    </>
);

export default Layout;
