import { ReactElement } from "react";

import { Consent } from "./consent-provider/consent";
import { useConsent } from "./consent-provider/consent-context";

export const AdProvider = (): ReactElement | null => {
    const { consent } = useConsent();

    if (consent !== Consent.Accepted) {
        return null;
    }

    return (
        <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3996014859104973"
            crossOrigin="anonymous"
        />
    );
};
