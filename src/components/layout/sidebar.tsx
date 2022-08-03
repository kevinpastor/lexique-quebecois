import { Card, CardContent, Typography } from "@mui/material";
import { ReactElement } from "react";

export const Sidebar = (): ReactElement => (
    <aside className="space-y-4">
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
                    variant="body2"
                    align="center"
                >
                    Une plateforme pour en apprendre plus sur la culture populaire québecoisse, peu importe si t&apos;es un ado, un millénial, ou un boomer.
                </Typography>
            </CardContent>
        </Card>
    </aside>
);
