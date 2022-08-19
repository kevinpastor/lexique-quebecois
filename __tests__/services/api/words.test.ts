import { AggregationCursor, Collection, Db, InsertOneResult } from "mongodb";

import { WordClass } from "@models/classes";
import { Status } from "@models/status";
import { Word } from "@models/word";
import { WordDocument } from "@models/word-document";
import { WordRequest } from "@models/word-request";
import { getDatabase } from "@services/api/database";
import { addWord, getWordCollection, getWordsSample } from "@services/api/words";

jest.mock("@services/api/database", (): typeof import("@services/api/database") => ({
    ...jest.requireActual("@services/api/database"),
    getDatabase: jest.fn() as jest.MockedFunction<typeof getDatabase>
}));

const getDatabaseMock = getDatabase as jest.MockedFunction<typeof getDatabase>;

const ip: string = "127.0.0.1";

const wordRequestStub: WordRequest = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin"
};

const wordDocumentStub: WordDocument = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin",
    slug: "gyu",
    ip: "127.0.0.1",
    isApproved: false,
    likes: [],
    dislikes: []
};

const wordStub: Word = {
    id: "507f1f77bcf86cd799439011",
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin",
    timestamp: 1645120033319,
    slug: "gyu",
    likes: 2,
    isLiked: true,
    dislikes: 0,
    isDisliked: false
};

const anotherWordStub: Word = {
    id: "00000020f51bb4362eee2a4d",
    label: "quêteux",
    wordClasses: [WordClass.Nom],
    definition: "Expression pour désigner un mendiant.",
    example: "Le quêteux sur le bord de la rue faisait pitié.",
    author: "Kevin",
    timestamp: 1645122767705,
    slug: "queteux",
    likes: 3,
    isLiked: false,
    dislikes: 2,
    isDisliked: true
};

const wordsStub: Array<Word> = [
    wordStub,
    anotherWordStub
];

// describe("getWordIndex", (): void => {
//     const wordIndexStub: Array<string> = [
//         wordStub.label,
//         anotherWordStub.label
//     ];

//     beforeEach((): void => {
//         jest.resetAllMocks();
//     });

//     it("should get word index", async (): Promise<void> => {
//         getDatabaseMock.mockResolvedValue({
//             collection: (): Collection<WordDocument> => ({
//                 aggregate: (): AggregationCursor<Word> => ({
//                     toArray: jest.fn()
//                         .mockResolvedValue(wordsStub)
//                 } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>)
//             } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
//         } as Partial<Db> as Db);

//         const wordIndex: Array<string> = await getWordIndex();

//         expect(wordIndex).toEqual(wordIndexStub);
//     });
// });

describe("getWordsSample", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it.skip("should get word sample", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                aggregate: (): AggregationCursor<Word> => {
                    const aggregationCursor: AggregationCursor<Word> = {
                        map: (): AggregationCursor<Word> => (
                            aggregationCursor
                        ),
                        toArray: jest.fn()
                            .mockResolvedValueOnce(wordsStub)
                            .mockResolvedValue(["0", "1", "2", "3", "4", "5", "6"])
                    } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>;

                    return aggregationCursor;
                }
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const words: Array<Word> = await getWordsSample(ip);

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
                aggregate: (): AggregationCursor<Word> => ({
                    toArray: jest.fn()
                        .mockResolvedValue([])
                } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const wordCollection: Array<Word> = await getWordCollection(slug, ip);

        expect(wordCollection).toEqual([]);
    });

    it("should get word", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                aggregate: (): AggregationCursor<Word> => ({
                    toArray: jest.fn()
                        // TODO Refactor
                        .mockResolvedValue([wordsStub[0]])
                } as Partial<AggregationCursor<Word>> as AggregationCursor<Word>)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const wordCollection: Array<Word> = await getWordCollection(slug, ip);

        expect(wordCollection).toEqual([wordsStub[0]]);
    });
});

describe("addWord", (): void => {
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
        const anonymousWordRequestStub: WordRequest = {
            ...wordRequestStub,
            author: undefined
        };
        insertOneMock.mockResolvedValue({
            acknowledged: true
        } as Partial<InsertOneResult> as InsertOneResult);
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                insertOne: insertOneMock
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);
        jest.setSystemTime(0);

        const result: Status = await addWord(anonymousWordRequestStub, ip);

        expect(result).toEqual(Status.Created);
        const anonymousWordDocumentStub: WordDocument = {
            ...wordDocumentStub,
            author: "Anonyme"
        };
        expect(insertOneMock).toHaveBeenCalledWith(anonymousWordDocumentStub);
    });

    it("should add a word", async (): Promise<void> => {
        insertOneMock.mockResolvedValue({
            acknowledged: true
        } as Partial<InsertOneResult> as InsertOneResult);
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                insertOne: insertOneMock
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);
        jest.setSystemTime(0);

        const result: Status = await addWord(wordRequestStub, ip);

        expect(result).toEqual(Status.Created);
        expect(insertOneMock).toHaveBeenCalledWith(wordDocumentStub);
    });

    it("should add a word", async (): Promise<void> => {
        insertOneMock.mockResolvedValue({
            acknowledged: false
        } as Partial<InsertOneResult> as InsertOneResult);
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                insertOne: insertOneMock
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);
        jest.setSystemTime(0);

        const result: Status = await addWord(wordRequestStub, ip);

        expect(result).toEqual(Status.InternalError);
        expect(insertOneMock).toHaveBeenCalledWith(wordDocumentStub);
    });
});
