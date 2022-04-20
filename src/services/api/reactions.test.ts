import { Collection, Db, UpdateResult } from "mongodb";

import { WordDocument } from "@models/word-document";

import { getDatabase } from "./database";
import { like, removeLike, dislike, removeDislike } from "./reactions";

jest.mock("./database", (): typeof import("./database") => ({
    ...jest.requireActual("./database"),
    getDatabase: jest.fn() as jest.MockedFunction<typeof getDatabase>
}));

const getDatabaseMock = getDatabase as jest.MockedFunction<typeof getDatabase>;

const slug: string = "foo";
const ip: string = "127.0.0.1";

describe("like", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not like non existent word", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        matchedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        await expect(like(slug, ip)).rejects.toBeDefined();
    });

    it("should not like already liked word", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await like(slug, ip);

        expect(result).toBeFalsy();
    });

    it("should like", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 1
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await like(slug, ip);

        expect(result).toBeTruthy();
    });
});

describe("removeLike", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not remove like on non existant word", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        matchedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        await expect(removeLike(slug, ip)).rejects.toBeDefined();
    });

    it("should not remove non existent like", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await removeLike(slug, ip);

        expect(result).toBeFalsy();
    });

    it("should remove like", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 1
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await removeLike(slug, ip);

        expect(result).toBeTruthy();
    });
});

describe("dislike", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not dislike non existent word", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        matchedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        await expect(dislike(slug, ip)).rejects.toBeDefined();
    });

    it("should not dislike already disliked word", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await dislike(slug, ip);

        expect(result).toBeFalsy();
    });

    it("should dislike", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 1
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await dislike(slug, ip);

        expect(result).toBeTruthy();
    });
});

describe("removeDislike", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not remove dislike on non existant word", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        matchedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        await expect(removeDislike(slug, ip)).rejects.toBeDefined();
    });

    it("should not remove non existent dislike", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 0
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await removeDislike(slug, ip);

        expect(result).toBeFalsy();
    });

    it("should remove dislike", async (): Promise<void> => {
        getDatabaseMock.mockResolvedValue({
            collection: (): Collection<WordDocument> => ({
                updateOne: jest.fn()
                    .mockResolvedValue({
                        modifiedCount: 1
                    } as Partial<UpdateResult> as UpdateResult)
            } as Partial<Collection<WordDocument>> as Collection<WordDocument>)
        } as Partial<Db> as Db);

        const result: boolean = await removeDislike(slug, ip);

        expect(result).toBeTruthy();
    });
});
