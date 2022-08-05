import { Card, CardActions, CardContent, CardHeader, Skeleton, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

export const LoadingIndex = (): ReactElement => (
    <Stack spacing={2}>
        {[...Array(5)].map((_, index): ReactElement => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index}>
                <CardHeader title={<Skeleton width={256} />} />
                <CardContent>
                    <Stack
                        spacing={1.5}
                        ml={2}
                    >
                        <Typography variant="body2">
                            <Skeleton width="100%" />
                        </Typography>
                        <Typography variant="subtitle1">
                            <Skeleton width="100%" />
                        </Typography>
                        <Typography variant="subtitle2">
                            <Skeleton width="100%" />
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
        ))}
    </Stack>
);
