import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { getClientIp } from "request-ip";

import { Word } from "@components/misc/word";
import { Word as IWord } from "@models/word";
import { getWordsSample } from "@services/api/words";
import { delay } from "@utils/misc/time";

interface Props {
    words: Array<IWord>;
}

// TODO Investigate if the page can be partially generated statically. Initially reverted to this because of likes.
export const getServerSideProps = async ({ req }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const ip: string = getClientIp(req) ?? "";

    const words: Array<IWord> = await getWordsSample(ip);

    await delay(5000);

    return {
        props: {
            words
        }
    };
};

const Home = ({ words }: Props): ReactElement => (
    <div className="space-y-4">
        {words.map((word: IWord): ReactElement => (
            <Word
                key={word.timestamp}
                word={word}
            />
        ))}
    </div>
);

export default Home;
