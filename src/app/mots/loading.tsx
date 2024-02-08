import { Card, CardContent, CardHeader, Skeleton, Typography } from "@mui/material";
import { type ReactNode } from "react";

const Loading = (): ReactNode => (
    <Card>
        <CardHeader title={<Skeleton width={256} />} />
        <CardContent>
            {[...Array<unknown>(5)].map((_: unknown, index: number): ReactNode => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                    <Typography variant="h3">
                        <Skeleton width={24} />
                    </Typography>
                    <Typography>
                        <Skeleton width="25%" />
                    </Typography>
                    <Typography>
                        <Skeleton width="25%" />
                    </Typography>
                    <Typography gutterBottom>
                        <Skeleton width="25%" />
                    </Typography>
                </div>
            ))}
        </CardContent>
    </Card>
);

export default Loading;
