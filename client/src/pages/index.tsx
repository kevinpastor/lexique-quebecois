import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { Definition } from "@components/definition";
import { Definition as IDefinition } from "@shared/models/definition";
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
