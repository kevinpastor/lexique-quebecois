import type { } from "@mui/lab/themeAugmentation";
import { createTheme, alpha, colors, PaletteMode, Theme, lighten } from "@mui/material";

const getHighEmphasyColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? alpha(colors.common.black, 0.87)
        : alpha(colors.common.white, 0.87)
);

const highEmphasyColorOnPrimary: string = alpha(colors.common.white, 0.87);

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

const getHalfOutlineColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? alpha(colors.common.black, 0.06)
        : alpha(colors.common.white, 0.06)
);

const getHoveredOutlineColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? alpha(colors.common.black, 0.16)
        : alpha(colors.common.white, 0.16)
);

const getPaperBackgroundColor = (paletteMode: PaletteMode): string => (
    paletteMode === "light"
        ? colors.common.white
        : "#121212"
);

interface ElevationOverlay {
    [elevation: number]: number;
}

// Values taken from https://material.io/design/color/dark-theme.html
const darkElevationOverlay: ElevationOverlay = {
    [0]: 0,
    [1]: 0.05,
    [2]: 0.07,
    [3]: 0.08,
    [4]: 0.09,
    [6]: 0.11,
    [8]: 0.12,
    [12]: 0.14,
    [16]: 0.15,
    [24]: 0.16
};

type DefinedEvelation = keyof typeof darkElevationOverlay;

const definedElevations: Array<DefinedEvelation> = Object.keys(darkElevationOverlay)
    .map((key): DefinedEvelation => parseInt(key, 10));

const getElevationBackgroundColor = (paletteMode: PaletteMode, elevation: DefinedEvelation): string => (
    paletteMode === "light"
        ? getPaperBackgroundColor(paletteMode)
        : lighten(getPaperBackgroundColor(paletteMode), darkElevationOverlay[elevation])
);

const lineHeight: number = 1.5;

const borderRadius: number = 4;

export const getTheme = (paletteMode: PaletteMode): Theme => (
    createTheme({
        palette: {
            mode: paletteMode,
            primary: {
                main: "#2186d9"
            },
            secondary: {
                main: "#f78104"
            },
            divider: getOutlineColor(paletteMode)
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
                fontSize: 20,
                fontWeight: 600,
                lineHeight
            },
            h4: {
                fontSize: 18,
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
            MuiAlert: {
                defaultProps: {
                    variant: "filled",
                    icon: false,
                    elevation: 6,
                    sx: {
                        width: "100%"
                    }
                },
                styleOverrides: {
                    filledWarning: {
                        color: "white"
                    }
                }
            },
            MuiAppBar: {
                defaultProps: {
                    color: "inherit",
                    position: "sticky"
                }
            },
            MuiButton: {
                defaultProps: {
                    variant: "outlined",
                    color: "inherit"
                },
                styleOverrides: {
                    root: {
                        textTransform: "none"
                    },
                    outlined: {
                        borderWidth: 2,
                        borderColor: getOutlineColor(paletteMode),
                        ":hover": {
                            borderWidth: 2,
                            borderColor: getOutlineColor(paletteMode)
                        }
                    },
                    containedPrimary: {
                        color: highEmphasyColorOnPrimary
                    }
                }
            },
            MuiButtonGroup: {
                defaultProps: {
                    color: "inherit"
                },
                styleOverrides: {
                    grouped: {
                        ":not(:last-of-type):hover": {
                            borderRightColor: getHalfOutlineColor(paletteMode)
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
                        borderWidth: 2
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
                        margin: 16,
                        padding: 0
                    }
                }
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        margin: 16,
                        padding: 0,
                        ":last-child": {
                            paddingBottom: 0
                        }
                    }
                }
            },
            MuiCardActions: {
                styleOverrides: {
                    root: {
                        margin: 16,
                        padding: 0
                    }
                }
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderBottomWidth: 2
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
                    noWrap: true,
                    style: {
                        display: "inline-block",
                        maxWidth: "100%",
                        verticalAlign: "bottom"
                    }
                }
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius
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
                        "&:hover:not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                            borderColor: getHoveredOutlineColor(paletteMode)
                        }
                    },
                    notchedOutline: {
                        borderWidth: 2,
                        borderColor: getOutlineColor(paletteMode)
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        transitionDuration: "300ms",
                        transitionProperty: "box-shadow, background-color",
                        backgroundImage: "none"
                    },
                    ...definedElevations.reduce((accumulator, elevation) => ({
                        ...accumulator,
                        [`elevation${elevation}`]: {
                            backgroundColor: getElevationBackgroundColor(paletteMode, elevation)
                        }
                    }), {})
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
                    // gutterBottom: true, // TODO Add this to remove all instances
                    variantMapping: {
                        subtitle1: "p",
                        subtitle2: "p"
                    }
                },
                styleOverrides: {
                    gutterBottom: {
                        marginBottom: "0.5em"
                    }
                }
            }
        }
    })
);
