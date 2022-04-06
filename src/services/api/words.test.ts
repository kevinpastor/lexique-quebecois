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
import { anotherWordStub, wordStub } from "@models/word.stub";
import { wordRequestStub } from "@models/word-request.stub";
import { wordDocumentStub } from "@models/word-document.stub";

jest.mock("./database", (): typeof import("./database") => ({
    ...jest.requireActual("./database"),
    getDatabase: jest.fn() as jest.MockedFunction<typeof getDatabase>
}));

const getDatabaseMock = getDatabase as jest.MockedFunction<typeof getDatabase>;

describe("@services", (): void => {
    describe("api", (): void => {
        describe("words", (): void => {
            const wordsStub: Array<Word> = [
                wordStub,
                anotherWordStub
            ];

            describe("getWordIndex", (): void => {
                const wordIndexStub: Array<string> = [
                    wordStub.label,
                    anotherWordStub.label
                ];

                beforeEach((): void => {
                    jest.resetAllMocks();
                });

                it("should get word index", async (): Promise<void> => {
                    getDatabaseMock.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            aggregate: (): AggregationCursor<Word> => ({
                                toArray: jest.fn()
                                    .mockResolvedValue(wordsStub)
                            } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>)
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const wordIndex: Array<string> = await getWordIndex();

                    expect(wordIndex).toEqual(wordIndexStub);
                });
            });

            describe("getWordsSample", (): void => {
                beforeEach((): void => {
                    jest.resetAllMocks();
                });

                it("should get word sample", async (): Promise<void> => {
                    getDatabaseMock.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            aggregate: (): AggregationCursor<Word> => ({
                                toArray: jest.fn()
                                    .mockResolvedValue(wordsStub)
                            } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>)
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const words: Array<Word> = await getWordsSample();

                    expect(words).toHaveLength(wordsStub.length);
                    expect([...words].sort(({ slug: a }, { slug: b }) => {
                        if (a < b) {
                            return -1;
                        }

                        if (a > b) {
                            return 1;
                        }

                        return 0;
                    })).toEqual(wordsStub);
                });
            });

            describe("getWord", (): void => {
                const slug: string = "gyu";

                beforeEach((): void => {
                    jest.resetAllMocks();
                });

                it("should not find word", async (): Promise<void> => {
                    getDatabaseMock.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            findOne: jest.fn()
                                .mockResolvedValue(undefined)
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const word: Word | undefined = await getWord(slug);

                    expect(word).toBeUndefined();
                });

                it("should get word", async (): Promise<void> => {
                    getDatabaseMock.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            findOne: jest.fn()
                                // TODO Refactor
                                .mockResolvedValue(wordsStub[0])
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);

                    const word: Word | undefined = await getWord(slug);

                    expect(word).toEqual(wordsStub[0]);
                });
            });

            describe("addWord", (): void => {
                const ip: string = "127.0.0.1";

                const insertOneMock = jest.fn()
                    .mockResolvedValue(undefined);

                beforeEach((): void => {
                    jest.resetAllMocks();
                    jest.useFakeTimers();
                });

                afterEach((): void => {
                    jest.useRealTimers();
                });

                it("should add an anonymous word", async (): Promise<void> => {
                    getDatabaseMock.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            insertOne: insertOneMock
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);
                    jest.setSystemTime(0);

                    await addWord(wordRequestStub, ip);

                    expect(insertOneMock).toHaveBeenCalledWith(wordDocumentStub);
                });

                it("should add a word", async (): Promise<void> => {
                    getDatabaseMock.mockResolvedValue({
                        collection: (): Collection<WordDocument> => ({
                            insertOne: insertOneMock
                        } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
                    } as Partial<Db> as Db);
                    jest.setSystemTime(0);

                    await addWord(wordRequestStub, ip);

                    expect(insertOneMock).toHaveBeenCalledWith(wordDocumentStub);
                });
            });
        });
    });
});
