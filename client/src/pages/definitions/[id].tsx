import { ReactElement } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { Definition as DefinitionComponent } from "@components/definition";
import { Definition } from "@shared/models/definition";
import { getDefinition } from "src/requests/definition";

interface Props {
    definition?: Definition;
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const { id } = query;

    if (typeof id !== "string") {
        return {
            props: {}
        };
    }

    const definition: Definition | undefined = await getDefinition(id);

    return {
        props: {
            definition
        }
    };
};

const DefinitionPage = ({ definition }: Props): ReactElement => (
    <DefinitionComponent definition={definition} />
);

export default DefinitionPage;
