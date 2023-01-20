import { PropsWithChildren, ReactElement } from "react";

export const AdProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3996014859104973"
            crossOrigin="anonymous"
        />
        {children}
    </>
);
