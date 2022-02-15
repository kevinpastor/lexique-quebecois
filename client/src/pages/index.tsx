import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { Definition as IDefinition } from "@quebecois-urbain/shared/models/definition";
import { Definition } from "@components/definition";
import { getDefinition } from "src/requests/definition";

interface Props {
    definition?: IDefinition;
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
    const definition: IDefinition | undefined = await getDefinition("gyu");

    return {
        props: {
            definition
        }
    };
};

const Home = ({ definition }: Props): ReactElement => (
    <Definition definition={definition} />
);

export default Home;
