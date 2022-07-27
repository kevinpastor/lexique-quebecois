import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, ButtonGroup, Card, CardContent } from "@mui/material";
import { ReactElement } from "react";

import { Heading } from "@components/typography/heading";
import { Paragraph } from "@components/typography/paragraph";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";

const Components = (): ReactElement => (
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
);

export default Components;
