import { Card, CardContent, CardHeader, Skeleton, Typography } from "@mui/material";
import { ReactElement } from "react";

import { getRandomInteger } from "@utils/misc/random";

export const LoadingWordIndex = (): ReactElement => (
    <Card>
        <CardHeader title={<Skeleton width={256} />} />
        <CardContent>
            {[...Array(5)].map((_, index): ReactElement => (
                <>
                    <Typography
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        variant="h2"
                    >
                        <Skeleton width={24} />
                    </Typography>
                    {[...Array(3)].map((__, subIndex): ReactElement => (
                        <Typography
                            // eslint-disable-next-line react/no-array-index-key
                            key={subIndex}
                            variant="h3"
                        >

                            <Skeleton width={48 + getRandomInteger(64)} />
                        </Typography>
                    ))}
                </>
            ))}
        </CardContent>
    </Card>
);
