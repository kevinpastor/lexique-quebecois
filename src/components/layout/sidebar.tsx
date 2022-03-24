import { ReactElement } from "react";

import { Card } from "@components/misc/card";

export const Sidebar = (): ReactElement => (
    <aside className="space-y-4">
        <Card>
            <div className="text-xl font-medium text-center">
                Un peu comme Urban Dictionary, mais québécois.
            </div>
        </Card>
        <Card>
            <div className="text-center">
                Une plateforme pour en apprendre plus sur la culture populaire, peu importe si t&apos;es un ado, un millénial, ou un boomer.
            </div>
        </Card>
    </aside>
);
