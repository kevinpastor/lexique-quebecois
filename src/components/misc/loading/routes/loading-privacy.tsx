import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { ReactElement } from "react";

import { getRandomInteger } from "@utils/misc/random";

export const LoadingPrivacy = (): ReactElement => (
    <Card>
        <CardHeader title={<Skeleton width={256} />} />
        <CardContent>
            {[...Array(25)].map((_, index): ReactElement => (
                <Skeleton
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    width={`${90 + getRandomInteger(10)}%`}
                />
            ))}
        </CardContent>
    </Card>
);
