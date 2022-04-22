import { ReactElement } from "react";

import { Card } from "@components/misc/card";
import { Title } from "@components/typography/title";

const InternalError = (): ReactElement => (
    <Card>
        <Title>
            Une erreur s&apos;est produite
        </Title>
        <div className="text-slate-100 font-medium">
            Impossible de charger l&apos;information
        </div>
    </Card>
);

export default InternalError;
