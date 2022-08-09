import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { LoadingWord } from "@components/misc/loading/routes/loading-word";
import { WordPage } from "@components/pages/word-page";
import { Word } from "@models/word";
import { getWordCollection, getWordsSlug } from "@services/api/words";

type Params = {
    slug: string;
};

type Paths = GetStaticPathsResult<Params>["paths"];
type Path = GetStaticPathsResult<Params>["paths"][0];

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult<Params>> => {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: "blocking"
        };
    }

    const slugs: Array<string> = await getWordsSlug();
    const paths: Paths = slugs.map((slug: string): Path => ({
        params: {
            slug
        }
    }));

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> => {
    if (!params) {
        throw new Error("Called not from a dynamic route.");
    }

    const { slug } = params;
    const wordCollection: Array<Word> = await getWordCollection(slug);

    return {
        props: {
            fallback: {
                [`/api/words/${slug}`]: wordCollection
            }
        },
        revalidate: 60 * 60 * 24 // Every day
    };
};

const WordPageWrapper = ({ fallback }: Props): ReactElement => {
    const { isFallback } = useRouter();

    if (isFallback) {
        return (
            <LoadingWord />
        );
    }

    return (
        <SWRConfig value={{ fallback }}>
            <WordPage />
        </SWRConfig>
    );
};

export default WordPageWrapper;
