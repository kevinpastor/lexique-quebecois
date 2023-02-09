export const getHCaptchaSiteKey = (): string => {
    if (!process.env["NEXT_PUBLIC_HCAPTCHA_SITE_KEY"]) {
        throw new Error("NEXT_PUBLIC_HCAPTCHA_SITE_KEY environment variable is not set.");
    }

    return process.env["NEXT_PUBLIC_HCAPTCHA_SITE_KEY"];
};

export const getHCaptchaSecret = (): string => {
    if (!process.env["HCAPTHCA_SECRET"]) {
        throw new Error("HCAPTHCA_SECRET environment variable is not set.");
    }

    return process.env["HCAPTHCA_SECRET"];
};

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

    const result = await response.json();

    return result.success;
};
