import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, ButtonGroup, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ReactElement } from "react";

import { Heading } from "@components/typography/heading";
import { Paragraph } from "@components/typography/paragraph";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";

const Components = (): ReactElement => (
    <>
        <Card>
            <CardContent>
                <Title>
                    Components
                </Title>
                <Section>
                    <Heading>
                        Button
                    </Heading>
                    <Paragraph>
                        <Button>
                            Label
                        </Button>
                    </Paragraph>
                    <Paragraph>
                        <ButtonGroup>
                            <Button startIcon={<ThumbUp className="text-amber-500" />}>
                                23
                            </Button>
                            <Button startIcon={<ThumbDown />}>
                                6
                            </Button>
                        </ButtonGroup>
                    </Paragraph>
                </Section>
            </CardContent>
        </Card>
        <Card>
            <CardHeader title="Typography" />
            <CardContent>
                <Typography variant="h1">
                    Heading 1
                </Typography>
                <Typography variant="h2">
                    Heading 2
                </Typography>
                <Typography variant="h3">
                    Heading 3
                </Typography>
                <Typography variant="h4">
                    Heading 4
                </Typography>
                <Typography variant="h5">
                    Heading 5
                </Typography>
                <Typography variant="h6">
                    Heading 6
                </Typography>
                <Typography variant="body1">
                    Body 1
                </Typography>
                <Typography variant="body2">
                    Body 2
                </Typography>
                <Typography variant="subtitle1">
                    Subtitle 1
                </Typography>
                <Typography variant="subtitle2">
                    Subtitle 2
                </Typography>
                <Typography variant="caption">
                    Caption
                </Typography>
                <Typography variant="button">
                    Button
                </Typography>
                <Typography variant="overline">
                    Overline
                </Typography>
            </CardContent>
        </Card>
    </>
);

export default Components;
