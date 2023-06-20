import { ReactElement, useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle?: Array<Record<string, unknown>>;
    }
}

interface Props {
    client: string;
    slot: string;
}

export const Ad = ({ client, slot }: Props): ReactElement => {
    useEffect((): void => {
        try {
            window.adsbygoogle = window.adsbygoogle ?? [];
            window.adsbygoogle.push({});
        }
        catch (error: unknown) {
            console.warn("An error occured while loading an ad: ", error);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{
                display: "block"
            }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};
