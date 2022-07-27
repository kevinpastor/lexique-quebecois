import { createTheme, alpha } from "@mui/material";
import colors from "tailwindcss/colors";

const highEmphasyColor: string = alpha(colors.black, 0.87);
const outlineColor: string = alpha(colors.black, 0.12);

export const theme = createTheme({
    typography: {
        fontFamily: ["Lora"].join(","),
        fontSize: 16
    },
    components: {
        MuiButtonBase: {
            defaultProps: {

            }
        },
        MuiButton: {
            defaultProps: {
                variant: "outlined"
            },
            styleOverrides: {
                root: {
                    color: highEmphasyColor,
                    textTransform: "none"
                },
                outlined: {
                    border: `2px solid ${outlineColor}`,
                    ":hover": {
                        border: `2px solid ${outlineColor}`
                    }
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                grouped: {
                    ":not(:last-of-type):hover": {
                        borderRightColor: outlineColor
                    }
                }
            }
        },
        MuiCard: {
            defaultProps: {
                variant: "outlined"
            },
            styleOverrides: {
                root: {
                    border: `2px solid ${outlineColor}`
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: "16px"
                }
            }
        }
    }
});
