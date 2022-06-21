import { Collection, Db, UpdateResult } from "mongodb";

import { Status } from "@models/status";
import { WordDocument } from "@models/word-document";

import { getDatabase } from "./database";
import { like, removeLike, dislike, removeDislike } from "./reactions";

jest.mock("./database", (): typeof import("./database") => ({
    ...jest.requireActual("./database"),
    getDatabase: jest.fn() as jest.MockedFunction<typeof getDatabase>
}));

const getDatabaseMock = getDatabase as jest.MockedFunction<typeof getDatabase>;

const id: string = "507f1f77bcf86cd799439011";
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

        const result: Status = await like(id, ip);

        expect(result).toEqual(Status.NotFound);
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

        const result: Status = await like(id, ip);

        expect(result).toEqual(Status.Conflict);
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

        const result: Status = await like(id, ip);

        expect(result).toEqual(Status.OK);
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

        const result: Status = await removeLike(id, ip);

        expect(result).toEqual(Status.NotFound);
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

        const result: Status = await removeLike(id, ip);

        expect(result).toEqual(Status.Conflict);
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

        const result: Status = await removeLike(id, ip);

        expect(result).toEqual(Status.OK);
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

        const result: Status = await dislike(id, ip);

        expect(result).toEqual(Status.NotFound);
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

        const result: Status = await dislike(id, ip);

        expect(result).toEqual(Status.Conflict);
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

        const result: Status = await dislike(id, ip);

        expect(result).toEqual(Status.OK);
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

        const result: Status = await removeDislike(id, ip);

        expect(result).toEqual(Status.NotFound);
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

        const result: Status = await removeDislike(id, ip);

        expect(result).toEqual(Status.Conflict);
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

        const result: Status = await removeDislike(id, ip);

        expect(result).toEqual(Status.OK);
    });
});
