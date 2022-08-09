import type { } from "@mui/lab/themeAugmentation";
import { createTheme, alpha, colors, PaletteMode, Theme } from "@mui/material";

const getHighEmphasyColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? alpha(colors.common.black, 0.87)
        : alpha(colors.common.white, 0.87)
);

const getMediumEmphasyColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? alpha(colors.common.black, 0.60)
        : alpha(colors.common.white, 0.60)
);

const getOutlineColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? alpha(colors.common.black, 0.12)
        : alpha(colors.common.white, 0.12)
);

const getHoveredOutlineColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? alpha(colors.common.black, 0.16)
        : alpha(colors.common.white, 0.16)
);

const lineHeight: number = 1.5;

export const getTheme = (paletteMode: PaletteMode): Theme => (
    createTheme({
        palette: {
            mode: paletteMode,
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
                color: getHighEmphasyColor(paletteMode),
                fontSize: 18,
                fontWeight: 400,
                lineHeight
            },
            body2: {
                color: getHighEmphasyColor(paletteMode),
                fontSize: 18,
                fontWeight: 600,
                lineHeight
            },
            subtitle1: {
                color: getHighEmphasyColor(paletteMode),
                fontSize: 18,
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight
            },
            subtitle2: {
                color: getMediumEmphasyColor(paletteMode),
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
                }
            },
            MuiButton: {
                defaultProps: {
                    variant: "outlined"
                },
                styleOverrides: {
                    root: {
                        color: getHighEmphasyColor(paletteMode),
                        textTransform: "none"
                    },
                    outlined: {
                        border: `2px solid ${getOutlineColor(paletteMode)}`,
                        ":hover": {
                            border: `2px solid ${getOutlineColor(paletteMode)}`
                        }
                    }
                }
            },
            MuiButtonGroup: {
                styleOverrides: {
                    grouped: {
                        ":not(:last-of-type):hover": {
                            borderRightColor: getOutlineColor(paletteMode)
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
                        border: `2px solid ${getOutlineColor(paletteMode)}`
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
            MuiFormControl: {
                defaultProps: {
                    fullWidth: true
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
                            borderColor: getHoveredOutlineColor(paletteMode)
                        }
                    },
                    notchedOutline: {
                        border: `2px solid ${getOutlineColor(paletteMode)}`
                    }
                }
            },
            MuiSelect: {
                defaultProps: {
                    fullWidth: true
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
    })
);
