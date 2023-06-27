import { PropsWithChildren, ReactElement } from "react";

// Vaguely imitates the behavior of the Alert component of MUI.
export const LightweightErrorAlert = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <div
        style={{
            borderRadius: 4,
            boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
            padding: "14px 16px",
            backgroundColor: "#d32f2f",
            fontWeight: 500,
            color: "#fff",
            width: "100%",
            maxWidth: "450px"
        }}
    >
        {children}
    </div>
);
