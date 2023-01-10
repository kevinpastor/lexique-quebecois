import type { } from "@mui/lab/themeAugmentation";
import { alpha, colors, Theme, lighten, CssVarsTheme, experimental_extendTheme as extendTheme, CSSInterpolation } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

declare module "@mui/material/styles" {
    interface CustomTokens {
        highEmphasis: string;
        mediumEmphasis: string;
        outline: string;
        halfOutline: string;
        hoveredOutline: string;
        elevationBackground: {
            [key: number]: string;
        };
        highEmphasyColorOnPrimary: string;
    }

    interface PaletteOptions {
        customTokens: CustomTokens;
    }

    interface Palette {
        customTokens: CustomTokens;
    }
}

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

export const theme = extendTheme({
    cssVarPrefix: "",
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#2186d9"
                },
                secondary: {
                    main: "#f78104"
                },
                divider: alpha(colors.common.black, 0.12),
                customTokens: {
                    highEmphasis: alpha(colors.common.black, 0.87),
                    mediumEmphasis: alpha(colors.common.black, 0.60),
                    outline: alpha(colors.common.black, 0.12),
                    halfOutline: alpha(colors.common.black, 0.06),
                    hoveredOutline: alpha(colors.common.black, 0.16),
                    elevationBackground: definedElevations.reduce<{ [key: number]: string }>((accumulator, elevation) => ({
                        ...accumulator,
                        [elevation]: colors.common.white
                    }), {}),
                    highEmphasyColorOnPrimary: alpha(colors.common.white, 0.87)
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
                divider: alpha(colors.common.white, 0.12),
                customTokens: {
                    highEmphasis: alpha(colors.common.white, 0.87),
                    mediumEmphasis: alpha(colors.common.white, 0.60),
                    outline: alpha(colors.common.white, 0.12),
                    halfOutline: alpha(colors.common.white, 0.06),
                    hoveredOutline: alpha(colors.common.white, 0.16),
                    elevationBackground: definedElevations.reduce<{ [key: number]: string }>((accumulator, elevation) => ({
                        ...accumulator,
                        [elevation]: lighten("#121212", darkElevationOverlay[elevation])
                    }), {}),
                    highEmphasyColorOnPrimary: alpha(colors.common.white, 0.87)
                }
            }
        }
    },
    typography: {
        fontFamily: [
            "Lora",
            "Georgia",
            "serif"
        ].join(","),
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
                color: "inherit",
                position: "sticky"
            },
            styleOverrides: {
                colorDefault: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    backgroundColor: palette.background.default
                })
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
                    borderColor: palette.customTokens.outline,
                    ":hover": {
                        borderWidth: 2,
                        borderColor: palette.customTokens.outline
                    }
                }),
                // outlined: {
                //     borderWidth: 2,
                //     borderColor: getOutlineColor(paletteMode),
                //     ":hover": {
                //         borderWidth: 2,
                //         borderColor: getOutlineColor(paletteMode)
                //     }
                // },
                containedPrimary: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    color: palette.customTokens.highEmphasyColorOnPrimary
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
                        borderRightColor: palette.customTokens.halfOutline
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
                        borderColor: palette.customTokens.hoveredOutline
                    }
                }),
                notchedOutline: ({ theme: { vars: { palette } } }): CSSInterpolation => ({
                    borderWidth: 2,
                    borderColor: palette.customTokens.outline
                })
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    // Smooths out the theme transition.
                    transitionDuration: "300ms",
                    transitionProperty: "box-shadow, background-color, background-image"
                },
                ...definedElevations.reduce((accumulator, elevation) => ({
                    ...accumulator,
                    [`elevation${elevation}`]: ({ theme: { vars: { palette } } }: { theme: Omit<Theme, "palette" | "components"> & CssVarsTheme }): CSSInterpolation => ({
                        // This CSS variable seems to be undefined in dark mode.
                        "--AppBar-background": palette.customTokens.elevationBackground[elevation]
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
            },
            styleOverrides: {
                root: ({ theme: { vars: { palette } } }) => ({
                    color: palette.common.onBackground
                }),
                gutterBottom: {
                    marginBottom: "0.5em"
                },
                body1: ({ theme: { vars: { palette } } }) => ({
                    color: palette.customTokens.highEmphasis
                }),
                body2: ({ theme: { vars: { palette } } }) => ({
                    color: palette.customTokens.highEmphasis
                }),
                subtitle1: ({ theme: { vars: { palette } } }) => ({
                    color: palette.customTokens.highEmphasis
                }),
                subtitle2: ({ theme: { vars: { palette } } }) => ({
                    color: palette.customTokens.mediumEmphasis
                })
            }
        }
    }
});
