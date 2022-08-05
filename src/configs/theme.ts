import type { } from "@mui/lab/themeAugmentation";
import { createTheme, alpha, colors } from "@mui/material";

const highEmphasyColor: string = alpha(colors.common.black, 0.87);
const mediumEmphasyColor: string = alpha(colors.common.black, 0.60);
const outlineColor: string = alpha(colors.common.black, 0.12);
const hoveredOutlineColor: string = alpha(colors.common.black, 0.16);

const lineHeight: number = 1.5;

export const theme = createTheme({
    palette: {
        primary: {
            main: "#f59e0b"
        },
        secondary: {
            main: "#1976d2"
        }
    },
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
            fontSize: 20,
            fontWeight: 700,
            lineHeight
        },
        h2: {
            fontSize: 26,
            fontWeight: 600,
            lineHeight
        },
        h3: {
            fontSize: 22,
            fontWeight: 600,
            lineHeight
        },
        h4: {
            fontSize: 20,
            fontWeight: 600,
            lineHeight
        },
        // h5: {
        //     fontSize: 20,
        //     fontWeight: 600,
        //     lineHeight
        // },
        // h6: {
        //     fontSize: 20,
        //     fontWeight: 400,
        //     lineHeight
        // },
        body1: {
            color: highEmphasyColor,
            fontSize: 18,
            fontWeight: 400,
            lineHeight
        },
        body2: {
            color: highEmphasyColor,
            fontSize: 18,
            fontWeight: 600,
            lineHeight
        },
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
        MuiAppBar: {
            defaultProps: {
                color: "default",
                position: "sticky"
            },
            styleOverrides: {
                colorDefault: {
                    backgroundColor: colors.common.white
                }
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
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: "h2",
                    component: "h2" as "span" // MuiCardHeader seems to have a faulty type for the theme configuration
                }
            },
            styleOverrides: {
                root: {
                    margin: "16px",
                    padding: "0px"
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    margin: "16px",
                    padding: "0px",
                    ":last-child": {
                        paddingBottom: "0px"
                    }
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
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderBottomWidth: "2px"
                }
            }
        },
        MuiLink: {
            defaultProps: {
                color: "secondary",
                noWrap: true,
                style: {
                    display: "inline-block",
                    maxWidth: "100%",
                    verticalAlign: "bottom"
                }
            }
        },
        MuiLoadingButton: {
            defaultProps: {
                variant: "outlined"
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
        },
        MuiSkeleton: {
            defaultProps: {
                animation: "wave"
            }
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true
            }
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    subtitle1: "p",
                    subtitle2: "p"
                }
            }
        }
    }
});
