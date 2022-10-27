import { PropsWithChildren, ReactElement } from "react";

// Vaguely imitates the behavior of the Snackbar component of MUI.
export const LightweightSnackbar = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <div
        style={{
            zIndex: 1400,
            position: "fixed",
            left: 0,
            bottom: 0,
            right: 0,
            margin: 8
        }}
    >
        {children}
    </div>
);
