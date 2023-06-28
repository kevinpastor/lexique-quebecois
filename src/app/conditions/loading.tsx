import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { ReactElement } from "react";

const Loading = (): ReactElement => (
    <Card>
        <CardHeader title={<Skeleton width={256} />} />
        <CardContent>
            {[...Array(25)].map((_, index): ReactElement => (
                <Skeleton
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    width="100%"
                />
            ))}
        </CardContent>
    </Card>
);

export default Loading;
