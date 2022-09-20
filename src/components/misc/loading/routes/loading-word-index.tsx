import { Card, CardContent, CardHeader, Skeleton, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

export const LoadingWordIndex = (): ReactElement => (
    <Card>
        <CardHeader title={<Skeleton width={256} />} />
        <CardContent>
            <Stack spacing={2}>
                {[...Array(5)].map((_, index): ReactElement => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                        <Typography
                            variant="h2"
                        >
                            <Skeleton width={24} />
                        </Typography>
                        <Typography variant="h3">
                            <Skeleton width="25%" />
                            <Skeleton width="25%" />
                            <Skeleton width="25%" />
                        </Typography>
                    </div>
                ))}
            </Stack>
        </CardContent>
    </Card>
);
