import { Card, CardContent, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

// import { Ad } from "@components/misc/ad";

export const Sidebar = (): ReactElement => (
    <Stack
        spacing={2}
        component="aside"
    >
        <Card>
            <CardContent>
                <Typography align="center">
                    Un peu comme Urban Dictionary, mais tokébakicitte.
                </Typography>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <Typography
                    variant="body1"
                    align="center"
                >
                    Une plateforme pour en apprendre plus sur la culture populaire québecoisse, peu importe si t&apos;es un ado, un millénial, ou un boomer.
                </Typography>
            </CardContent>
        </Card>
        {/*
        TODO Show ad when AdSense is approved
        <Ad
            client="ca-pub-3996014859104973"
            slot="4892544775"
        />
        */}
    </Stack>
);
