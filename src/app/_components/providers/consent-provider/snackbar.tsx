import { Cookie } from "@mui/icons-material";
import { Button, Card, CardActions, CardHeader, Link, Snackbar, Stack } from "@mui/material";
import NextLink from "next/link";
import { type ReactElement } from "react";

export interface ConsentSnackbarProps {
    isOpen: boolean;
    onAccept: () => void;
    onRefuse: () => void;
}

export const ConsentSnackbar = ({ isOpen, onAccept: handleAccept, onRefuse: handleRefuse }: ConsentSnackbarProps): ReactElement => (
    <Snackbar
        open={isOpen}
        sx={{ maxWidth: "500px" }}
    >
        <Card
            variant="elevation"
            elevation={24}
        >
            <CardHeader
                title={
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Cookie fontSize="small" />
                        <div>
                            Cookies
                        </div>
                    </Stack>
                }
                titleTypographyProps={{
                    variant: "h4"
                }}
                subheader={
                    <>
                        {/* eslint-disable-next-line react/jsx-one-expression-per-line, react/jsx-max-props-per-line */}
                        En acceptant, tu consentes à ce que l&apos;on utilise des cookies conformément à notre <Link component={NextLink} href="/confidentialite">politique de confidentialité</Link>.
                    </>
                }
                subheaderTypographyProps={{
                    variant: "caption"
                }}
            />
            <CardActions>
                <Stack
                    direction="row-reverse"
                    width="100%"
                    spacing={1}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAccept}
                    >
                        Accepter
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleRefuse}
                    >
                        Refuser
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    </Snackbar>
);
