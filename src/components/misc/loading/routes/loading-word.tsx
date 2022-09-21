import { Card, CardActions, CardContent, CardHeader, Skeleton, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

export const LoadingWord = (): ReactElement => (
    <Card>
        <CardHeader title={<Skeleton width={128} />} />
        <CardContent>
            <Typography
                variant="body2"
                gutterBottom
            >
                <Skeleton width="100%" />
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
            >
                <Skeleton width="100%" />
            </Typography>
            <Typography variant="subtitle2">
                <Skeleton width="100%" />
            </Typography>
        </CardContent>
        <CardActions>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                width="100%"
            >
                <Skeleton width={128} />
                <Skeleton width={128} />
            </Stack>
        </CardActions>
    </Card>
);
