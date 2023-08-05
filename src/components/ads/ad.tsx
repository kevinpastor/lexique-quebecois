"use client";

import { type CSSProperties, type ReactElement, useEffect } from "react";

import { Consent } from "~/app/_components/providers/consent-provider/consent";
import { useConsent } from "~/app/_components/providers/consent-provider/context";

declare global {
    interface Window {
        adsbygoogle?: Array<Record<string, unknown>>;
    }
}

const getClient = (): string => {
    if (!process.env["NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT"]) {
        throw new Error("NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT is missing in environment variables.");
    }

    return process.env["NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT"];
};

interface Props {
    slot: string;
    layoutKey?: string;
    style?: CSSProperties;
    layout?: string;
    format?: string;
    fullWidthResponsive?: "true" | "false";
}

export const Ad = ({
    slot,
    style,
    layout,
    format,
    layoutKey,
    fullWidthResponsive = "true"
}: Props): ReactElement | null => {
    const { consent } = useConsent();

    useEffect((): void => {
        if (consent !== Consent.Accepted) {
            return;
        }

        try {
            window.adsbygoogle = window.adsbygoogle ?? [];
            window.adsbygoogle.push({});
        }
        catch (error: unknown) {
            console.warn("An error occured while loading an ad: ", error);
        }
    }, [consent]);

    if (consent !== Consent.Accepted) {
        return null;
    }

    const client: string = getClient();

    return (
        <ins
            className="adsbygoogle"
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-layout-key={layoutKey}
            style={style}
            data-ad-format={format}
            data-ad-layout={layout}
            data-full-width-responsive={fullWidthResponsive}
        />
    );
};
