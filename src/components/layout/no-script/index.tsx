import { ReactElement } from "react";

import { LightweightErrorAlert } from "./lightweight-error-alert";
import { LightweightSnackbar } from "./lightweight-snackbar";

export const NoScript = (): ReactElement => (
    <noscript>
        <LightweightSnackbar>
            <LightweightErrorAlert>
                Veuillez
                {" "}
                <a
                    href="https://www.enable-javascript.com/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit" }}
                >
                    activer JavaScript
                </a>
                .
            </LightweightErrorAlert>
        </LightweightSnackbar>
    </noscript>
);
