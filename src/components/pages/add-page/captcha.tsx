import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";

import { useAlerts } from "@utils/hooks/use-alerts";
import { useThemeMode } from "@utils/hooks/use-theme-mode";
import { getHCaptchaSiteKey } from "@utils/misc/hcaptcha";

export const Captcha = (): ReactElement => {
    const { setValue, resetField } = useFormContext();
    const handleVerify = (token: string): void => {
        setValue("captchaToken", token);
    };

    const handleExpire = (): void => {
        resetField("captchaToken", {
            keepDirty: true,
            keepTouched: true
        });
    };

    const { enqueueErrorAlert } = useAlerts();
    const handleError = (): void => {
        enqueueErrorAlert("Impossible de vérifier que vous n'êtes pas un robot. Veuillez réessayer plus tard.");
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
