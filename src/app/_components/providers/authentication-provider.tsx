import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { PropsWithChildren, ReactElement } from "react";

export type AuthenticationProviderProps = SessionProviderProps;

export const AuthenticationProvider = ({ session, children }: PropsWithChildren<AuthenticationProviderProps>): ReactElement => (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
);
