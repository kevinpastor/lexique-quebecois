import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ReactElement } from "react";
import { useController, useFormContext } from "react-hook-form";

import { WithCaptchaToken } from "@models/with-captcha-token";
import { useAlerts } from "@utils/hooks/use-alerts";
import { useThemeMode } from "@utils/hooks/use-theme-mode";
import { getHCaptchaSiteKey } from "@utils/misc/hcaptcha";

export const Captcha = (): ReactElement => {
    const { setValue, resetField } = useFormContext<WithCaptchaToken<unknown>>();
    const handleVerify = (token: string): void => {
        setValue("captchaToken", token);
    };

    // Needs to be called in order to be able to reset the captcha field.
    useController<WithCaptchaToken<unknown>>({ name: "captchaToken" });
    const handleExpire = (): void => {
        resetField("captchaToken", {
            keepDirty: true,
            keepTouched: true
        });
    };

    const { enqueueErrorAlert } = useAlerts();
    const handleError = (): void => {
        enqueueErrorAlert("Impossible de vérifier que tu n'est pas un robot. Réessaie plus tard.");
    };

    const { activeMode } = useThemeMode();

    return (
        <HCaptcha
            sitekey={getHCaptchaSiteKey()}
            onVerify={handleVerify}
            onExpire={handleExpire}
            onError={handleError}
            theme={activeMode}
            languageOverride="fr"
        />
    );
};
