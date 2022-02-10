import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Definition as DefinitionComponent } from "@components/definition";

const DefinitionPage = (): ReactElement => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <DefinitionComponent id={id as any} />
    );
};

export default DefinitionPage;
