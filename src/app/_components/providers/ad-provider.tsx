import { type ReactElement } from "react";
import { Helmet } from "react-helmet-async";

import { Consent } from "./consent-provider/consent";
import { useConsent } from "./consent-provider/context";

export const AdProvider = (): ReactElement | null => {
    const { consent } = useConsent();

    if (consent !== Consent.Accepted) {
        return null;
    }

    return (
        <Helmet>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3996014859104973"
                crossOrigin="anonymous"
            />
        </Helmet>
    );
};
