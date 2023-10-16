import { boolean, is, object } from "valibot";

export const getHCaptchaSiteKey = (): string => {
    if (!process.env["NEXT_PUBLIC_HCAPTCHA_SITE_KEY"]) {
        throw new Error("NEXT_PUBLIC_HCAPTCHA_SITE_KEY environment variable is not set.");
    }

    return process.env["NEXT_PUBLIC_HCAPTCHA_SITE_KEY"];
};

const getHCaptchaSecret = (): string => {
    if (!process.env["HCAPTHCA_SECRET"]) {
        throw new Error("HCAPTHCA_SECRET environment variable is not set.");
    }

    return process.env["HCAPTHCA_SECRET"];
};

interface HCapthcaVerifyResponse {
    success: boolean;
}

const hCaptchaVerifyResponseSchema = object({
    success: boolean()
});

const isHCaptchaVerifyResponse = (value: unknown): value is HCapthcaVerifyResponse => (
    is(hCaptchaVerifyResponseSchema, value)
);

export const verifyHCaptcha = async (token: string): Promise<boolean> => {
    const siteKey: string = getHCaptchaSiteKey();
    const secret: string = getHCaptchaSecret();

    const response = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            sitekey: siteKey, // TODO Investigate if this is case insensitive for possible simple refactor.
            secret,
            response: token
        })
    });

    const result: unknown = await response.json();

    if (!isHCaptchaVerifyResponse(result)) {
        throw new Error("Unexpected response from hCaptcha API.");
    }

    return result.success;
};
