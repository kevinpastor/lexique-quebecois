import { Card, CardActions, CardContent, CardHeader, Skeleton, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

import { getRandomInteger } from "@utils/misc/random";

export const LoadingWord = (): ReactElement => (
    <Card>
        <CardHeader title={<Skeleton width={256} />} />
        <CardContent>
            <Stack
                spacing={1.5}
                ml={2}
            >
                <Typography variant="body2">
                    <Skeleton width={`${50 + getRandomInteger(50)}%`} />
                </Typography>
                <Typography variant="subtitle1">
                    <Skeleton width={`${50 + getRandomInteger(50)}%`} />
                </Typography>
                <Typography variant="subtitle2">
                    <Skeleton width={`${50 + getRandomInteger(50)}%`} />
                </Typography>
            </Stack>
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
