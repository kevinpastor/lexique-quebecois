import type { } from "@mui/lab/themeAugmentation";
import { createTheme, alpha, colors } from "@mui/material";

const highEmphasyColor: string = alpha(colors.common.black, 0.87);
const mediumEmphasyColor: string = alpha(colors.common.black, 0.60);
const outlineColor: string = alpha(colors.common.black, 0.12);
const hoveredOutlineColor: string = alpha(colors.common.black, 0.16);

const lineHeight: number = 1.5;

export const theme = createTheme({
    typography: {
        fontFamily: [
            "Lora",
            "ui-sans-serif",
            "system-ui",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "Noto Sans",
            "sans-serif",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
            "Noto Color Emoji"
        ].join(","),
        fontSize: 18,
        h1: {
            fontSize: 40,
            lineHeight
        },
        h2: {
            fontSize: 36,
            lineHeight
        },
        h3: {
            fontSize: 32,
            lineHeight
        },
        h4: {
            fontSize: 28,
            lineHeight
        },
        h5: {
            fontSize: 24,
            lineHeight
        },
        h6: {
            fontSize: 20,
            lineHeight
        },
        body1: {
            color: highEmphasyColor,
            fontSize: 18,
            fontWeight: 600,
            lineHeight
        },
        // TODO
        // body2: {
        // },
        subtitle1: {
            color: highEmphasyColor,
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight
        },
        subtitle2: {
            color: mediumEmphasyColor,
            fontSize: 18,
            fontWeight: 400,
            lineHeight
        }
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
        MuiLoadingButton: {
            defaultProps: {
                variant: "outlined"
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
        MuiCardContent: {
            styleOverrides: {
                root: {
                    margin: "16px",
                    padding: "0px"
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    margin: "16px",
                    padding: "0px"
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
                        borderColor: hoveredOutlineColor
                    }
                },
                notchedOutline: {
                    border: `2px solid ${outlineColor}`
                }
            }
        }
    }
});
