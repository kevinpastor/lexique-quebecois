import { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { Definition as DefinitionComponent } from "../../components/definition"

export const DefinitionPage = (): ReactElement => {
    const { id } = useParams();

    return (
        <DefinitionComponent id={id as any} />
    );
}