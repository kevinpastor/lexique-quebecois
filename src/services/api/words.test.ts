import {
    addWord,
    getWord,
    getWordIndex, getWordsSample
} from "./words";

import { getDatabase } from "./database";
import { AggregationCursor, Collection, Db } from "mongodb";
import { WordDocument } from "@models/word-document";
import { Word } from "@models/word";
import { getSlug, WordRequest } from "@models/word-request";

jest.mock("./database", (): typeof import("./database") => ({
    ...jest.requireActual("./database"),
    getDatabase: jest.fn() as jest.MockedFunction<typeof getDatabase>
}));

const mockedGetDatabase = getDatabase as jest.MockedFunction<typeof getDatabase>;

describe("@services", (): void => {
    describe("api", (): void => {
        describe("words", (): void => {
            const mockedWords: Array<Word> = [
                {
                    label: "gyu",
                    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
                    example: "Le poulet était tellement gyu!",
                    author: "Kevin",
                    timestamp: 1645120033319,
                    slug: "gyu"
                },
                {
                    label: "quêteux",
                    definition: "Expression pour désigner un mendiant.",
                    example: "Le quêteux sur le bord de la rue faisait pitié.",
                    author: "Kevin",
                    timestamp: 1645122767705,
                    slug: "queteux"
                }
            ];

            describe("getWordIndex", (): void => {
                const mockedWordIndex: Array<string> = [
                    "gyu",
                    "quêteux"
                ];

                beforeEach((): void => {
                    jest.resetAllMocks();
                });

                it("should get word index", async (): Promise<void> => {
                    mockedGetDatabase.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            aggregate: (): AggregationCursor<Word> => ({
                                toArray: jest.fn()
                                    .mockResolvedValue(mockedWords)
                            } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>)
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const wordIndex: Array<string> = await getWordIndex();

                    expect(wordIndex).toEqual(mockedWordIndex);
                });
            });

            describe("getWordsSample", (): void => {
                beforeEach((): void => {
                    jest.resetAllMocks();
                });

                it("should get word sample", async (): Promise<void> => {
                    mockedGetDatabase.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            aggregate: (): AggregationCursor<Word> => ({
                                toArray: jest.fn()
                                    .mockResolvedValue(mockedWords)
                            } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>)
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const words: Array<Word> = await getWordsSample();

                    expect(words).toHaveLength(mockedWords.length);
                    expect([...words].sort(({ slug: a }, { slug: b }) => {
                        if (a < b) {
                            return -1;
                        }

                        if (a > b) {
                            return 1;
                        }

                        return 0;
                    })).toEqual(mockedWords);
                });
            });

            describe("getWord", (): void => {
                const slug: string = "gyu";

                beforeEach((): void => {
                    jest.resetAllMocks();
                });

                it("should not find word", async (): Promise<void> => {
                    mockedGetDatabase.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            findOne: jest.fn()
                                .mockResolvedValue(undefined)
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const word: Word | undefined = await getWord(slug);

                    expect(word).toBeUndefined();
                });

                it("should get word", async (): Promise<void> => {
                    mockedGetDatabase.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            findOne: jest.fn()
                                // TODO Refactor
                                .mockResolvedValue(mockedWords[0])
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const word: Word | undefined = await getWord(slug);

                    expect(word).toEqual(mockedWords[0]);
                });
            });

            describe("addWord", (): void => {
                const ip: string = "127.0.0.1";

                beforeEach((): void => {
                    jest.resetAllMocks();
                    jest.useFakeTimers();
                });

                afterEach((): void => {
                    jest.useRealTimers();
                });

                it("should add an anonymous word", async (): Promise<void> => {
                    const mockedInsertOne = jest.fn()
                        .mockResolvedValue(undefined);

                    mockedGetDatabase.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            insertOne: mockedInsertOne
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);
                    jest.setSystemTime(0);

                    const wordRequest: WordRequest = {
                        label: "gyu",
                        definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
                        example: "Le poulet était tellement gyu!"
                    };
                    await addWord(wordRequest, ip);

                    const wordDocument: WordDocument = {
                        ...wordRequest,
                        author: "Anonyme",
                        slug: getSlug(wordRequest.label),
                        ip,
                        isApproved: false,
                        timestamp: 0
                    };
                    expect(mockedInsertOne).toBeCalledWith(wordDocument);
                });

                it("should add a word", async (): Promise<void> => {
                    const mockedInsertOne = jest.fn()
                        .mockResolvedValue(undefined);

                    mockedGetDatabase.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            insertOne: mockedInsertOne
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);
                    jest.setSystemTime(0);

                    const wordRequest: Required<WordRequest> = {
                        label: "gyu",
                        definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
                        example: "Le poulet était tellement gyu!",
                        author: "Kevin"
                    };
                    await addWord(wordRequest, ip);

                    const wordDocument: WordDocument = {
                        ...wordRequest,
                        slug: getSlug(wordRequest.label),
                        ip,
                        isApproved: false,
                        timestamp: 0
                    };
                    expect(mockedInsertOne).toBeCalledWith(wordDocument);
                });
            });
        });
    });
});
