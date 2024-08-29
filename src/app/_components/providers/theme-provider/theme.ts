import type { } from "@mui/lab/themeAugmentation";
import { Slide } from "@mui/material";
import { common } from "@mui/material/colors";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { type CSSInterpolation, type CssVarsTheme, type Theme, alpha, createTheme, lighten } from "@mui/material/styles";

import { font } from "./font";

declare module "@mui/material/styles" {
    interface CustomTokens {
        ["high-emphasis"]: string;
        ["medium-emphasis"]: string;
        outline: string;
        ["half-outline"]: string;
        ["hovered-outline"]: string;
        background: Record<number, string>;
        ["high-emphasy-color-on-primary"]: string;
        ["glass-background"]: Record<number, string>;
    }

    interface PaletteOptions {
        custom: CustomTokens;
    }

    interface Palette {
        custom: CustomTokens;
    }
}

const definedElevations = [
    0, 1, 2, 3, 4, 6, 8, 12, 16, 24
] as const satisfies ReadonlyArray<number>;

type DefinedElevations = typeof definedElevations[number];

// Values taken from https://material.io/design/color/dark-theme.html
const darkElevationOverlay = {
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
} as const satisfies Record<DefinedElevations, number>;

export const colorSchemeSelector: string = "class";

export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#2186d9"
                },
                secondary: {
                    main: "#f78104"
                },
                divider: alpha(common.black, 0.12),
                custom: {
                    ["high-emphasis"]: alpha(common.black, 0.87),
                    ["medium-emphasis"]: alpha(common.black, 0.60),
                    outline: alpha(common.black, 0.12),
                    ["half-outline"]: alpha(common.black, 0.06),
                    ["hovered-outline"]: alpha(common.black, 0.16),
                    background: definedElevations.reduce<Record<number, string>>((accumulator, elevation) => ({
                        ...accumulator,
                        [elevation]: common.white
                    }), {}),
                    ["high-emphasy-color-on-primary"]: alpha(common.white, 0.87),
                    ["glass-background"]: definedElevations.reduce<Record<number, string>>((accumulator, elevation) => ({
                        ...accumulator,
                        [elevation]: alpha(common.white, 0.6)
                    }), {})
                },
                Tooltip: {
                    bg: "#6D6D6D"
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: "#2186d9"
                },
                secondary: {
                    main: "#f78104"
                },
                divider: alpha(common.white, 0.12),
                custom: {
                    ["high-emphasis"]: alpha(common.white, 0.87),
                    ["medium-emphasis"]: alpha(common.white, 0.60),
                    outline: alpha(common.white, 0.12),
                    ["half-outline"]: alpha(common.white, 0.06),
                    ["hovered-outline"]: alpha(common.white, 0.16),
                    background: definedElevations.reduce<Record<number, string>>((accumulator, elevation) => ({
                        ...accumulator,
                        [elevation]: lighten("#121212", darkElevationOverlay[elevation])
                    }), {}),
                    ["high-emphasy-color-on-primary"]: alpha(common.white, 0.87),
                    ["glass-background"]: definedElevations.reduce<Record<number, string>>((accumulator, elevation) => ({
                        ...accumulator,
                        [elevation]: alpha(lighten("#121212", darkElevationOverlay[elevation]), 0.6)
                    }), {})
                },
                Tooltip: {
                    bg: "#6D6D6D"
                }
            }
        }
    },
    typography: {
        fontFamily: font.style.fontFamily,
        fontSize: 18,
        allVariants: {
            lineHeight: 1.5
        },
        h1: {
            fontSize: 20,
            fontWeight: 700
        },
        h2: {
            fontSize: 26,
            fontWeight: 600
        },
        h3: {
            fontSize: 20,
            fontWeight: 600
        },
        h4: {
            fontSize: 18,
            fontWeight: 600
        },
        // h5: {
        //     fontSize: 20,
        //     fontWeight: 600
        // },
        // h6: {
        //     fontSize: 20,
        //     fontWeight: 400
        // },
        body1: {
            fontSize: 18,
            fontWeight: 400
        },
        body2: {
            fontSize: 18,
            fontWeight: 600
        },
        subtitle1: {
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: 400
        },
        subtitle2: {
            fontSize: 18,
            fontWeight: 400
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
                color: "inherit"
            },
            styleOverrides: {
                root: {
                    // Allows background color with transparency.
                    backgroundImage: "none",
                    // Allows elevation change.
                    transitionDuration: "300ms",
                    transitionProperty: "box-shadow, background-color"
                }
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
                outlined: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    borderWidth: 2,
                    borderColor: palette.custom.outline,
                    ":hover": {
                        borderWidth: 2,
                        borderColor: palette.custom.outline
                    }
                }),
                containedPrimary: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    color: palette.custom["high-emphasy-color-on-primary"]
                })
            }
        },
        MuiButtonGroup: {
            defaultProps: {
                color: "inherit"
            },
            styleOverrides: {
                grouped: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    ":not(:last-of-type):hover": {
                        borderRightColor: palette.custom["half-outline"]
                    }
                })
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
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    // Fixes a bug where a drawer using `backdrop-filter` is visible when the modal is hidden.
                    ".MuiModal-hidden &": {
                        opacity: 0
                    },
                    // A border seems to be required in order to make the backdrop filter properly work on iOS.
                    "@supports (backdrop-filter: none) or (-webkit-backdrop-filter: none)": {
                        borderRight: "1px solid transparent"
                    }
                }
            }
        },
        MuiFormControl: {
            defaultProps: {
                fullWidth: true
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: ({ theme: { vars: { palette } } }) => ({
                    color: palette.text.primary
                })
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
                root: ({ theme: { vars } }) => ({
                    borderRadius: vars.shape.borderRadius
                })
            }
        },
        MuiLoadingButton: {
            defaultProps: {
                variant: "outlined"
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    [`&:hover:not(.Mui-error):not(.Mui-focused) .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: palette.custom["hovered-outline"]
                    }
                }),
                notchedOutline: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    borderWidth: 2,
                    borderColor: palette.custom.outline
                })
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                },
                ...definedElevations.reduce((accumulator, elevation) => ({
                    ...accumulator,
                    [`elevation${elevation}`]: ({ theme: { vars: { palette } } }: { theme: Omit<Theme, "palette" | "components"> & CssVarsTheme }): CSSInterpolation => ({
                        // This CSS variable seems to be undefined in dark mode.
                        "--AppBar-background": palette.custom.background[elevation],
                        "--glass-background": palette.custom["glass-background"][elevation],
                        "@supports (backdrop-filter: none) or (-webkit-backdrop-filter: none)": {
                            "&:not(.MuiAlert-root)": {
                                backgroundImage: "none",
                                backgroundColor: "var(--glass-background)",
                                backdropFilter: "blur(20px) saturate(180%)",
                                ".MuiBackdrop-root ~ &": {
                                    backdropFilter: "blur(20px) saturate(180%) brightness(200%)"
                                }
                            }
                        }
                    })
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
        MuiSnackbar: {
            defaultProps: {
                TransitionComponent: Slide
            }
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true
            }
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true
            }
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    subtitle1: "p",
                    subtitle2: "p"
                }
            },
            styleOverrides: {
                gutterBottom: {
                    marginBottom: "0.5em"
                },
                body1: ({ theme: { vars: { palette } } }) => ({
                    color: palette.custom["high-emphasis"]
                }),
                body2: ({ theme: { vars: { palette } } }) => ({
                    color: palette.custom["high-emphasis"]
                }),
                subtitle1: ({ theme: { vars: { palette } } }) => ({
                    color: palette.custom["high-emphasis"]
                }),
                subtitle2: ({ theme: { vars: { palette } } }) => ({
                    color: palette.custom["medium-emphasis"]
                })
            }
        }
    }
});
