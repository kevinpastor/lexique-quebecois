import HCaptcha from "@hcaptcha/react-hcaptcha";
import { FormControl, FormHelperText } from "@mui/material";
import { type ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

import { useAlerts } from "~/hooks/use-alerts";
import { useThemeMode } from "~/hooks/use-theme-mode";
import { type WithToken } from "~/types/with-token";
import { getHCaptchaSiteKey } from "~/utils/misc/hcaptcha";

export const Captcha = (): ReactNode => {
    const { setValue, resetField } = useFormContext<WithToken<unknown>>();
    const handleVerify = (token: string): void => {
        setValue("token", token);
    };

    // Needs to be called in order to be able to reset the captcha field.
    const { fieldState: { error } } = useController<WithToken<unknown>>({ name: "token" });
    const handleExpire = (): void => {
        resetField("token", {
            keepDirty: true,
            keepTouched: true
        });
    };

    const { enqueueErrorAlert } = useAlerts();
    const handleError = (): void => {
        enqueueErrorAlert("Impossible de vérifier que tu n'es pas un robot. Réessaie plus tard.");
    };

    const { activeMode } = useThemeMode();

    return (
        <FormControl fullWidth>
            <HCaptcha
                sitekey={getHCaptchaSiteKey()}
                onVerify={handleVerify}
                onExpire={handleExpire}
                onError={handleError}
                theme={activeMode}
                languageOverride="fr"
            />
            {error && (
                <FormHelperText error>
                    {error.message}
                </FormHelperText>
            )}
        </FormControl>
    );
};
